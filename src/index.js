export default {
	async fetch(request, env, ctx) {
		// 解析请求的URL和查询参数
		const url = new URL(request.url);
		const queryParams = new URLSearchParams(url.search);
		const supportLanguage = ['cn']

		// 检查language参数是否为cn
		let language = queryParams.get('language');
		if (language != null){
			language = language.toLowerCase();
		}


		if (supportLanguage.includes(language)) {
			queryParams.delete('language'); // 移除language参数
		}

		// 构造目标URL
		const targetUrl = `https://db.ygoprodeck.com/api/v7/cardinfo.php?${queryParams.toString()}`;

		try {
			// 发起请求到目标URL
			const response = await fetch(targetUrl, {
				method: request.method,
				headers: request.headers,
			});

			// 解析返回的JSON数据
			const data = await response.json();

			// 如果language不是cn，直接返回数据
			if (!supportLanguage.includes(language)) {
				return new Response(JSON.stringify(data), {
					headers: { 'Content-Type': 'application/json' },
				});
			}

			// 如果language是cn，遍历data数组，查询数据库并替换name和desc
			if (data.data && Array.isArray(data.data)) {
				for (const card of data.data) {
					const dbResult = await env.DB.prepare(
						'SELECT name, desc FROM multi_language_card WHERE id = ? AND language = ?'
					)
						.bind(card.id, language)
						.first();

					if (dbResult) {
						card.name = dbResult.name; // 替换name
						card.desc = dbResult.desc; // 替换desc
					}
				}
			}

			// 返回修改后的数据
			return new Response(JSON.stringify(data), {
				headers: { 'Content-Type': 'application/json' },
			});
		} catch (error) {
			// 如果请求失败，返回错误信息
			return new Response(`Error fetching or processing data: ${error.message}`, {
				status: 500,
			});
		}
	},
};