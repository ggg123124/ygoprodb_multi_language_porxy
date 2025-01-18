export default {
	async fetch(request, env, ctx) {
		let typeData = {
			"Aqua": {
				"cn": "水族"
			},
			"Beast": {
				"cn": "兽族"
			},
			"Beast-warrior": {
				"cn": "兽战士族"
			},
			"Creator-god": {
				"cn": "创造神"
			},
			"Cyberse": {
				"cn": "电子界族"
			},
			"Dinosaur": {
				"cn": "恐龙族"
			},
			"Divine-Beast": {
				"cn": "幻神兽族"
			},
			"Dragon": {
				"cn": "龙族"
			},
			"Fairy": {
				"cn": "天使族"
			},
			"Fiend": {
				"cn": "恶魔族"
			},
			"Fish": {
				"cn": "鱼族"
			},
			"Insect": {
				"cn": "昆虫族"
			},
			"Machine": {
				"cn": "机械族"
			},
			"Plant": {
				"cn": "植物族"
			},
			"Psychic": {
				"cn": "念动力族"
			},
			"Pyro": {
				"cn": "炎族"
			},
			"Reptile": {
				"cn": "爬虫类族"
			},
			"Rock": {
				"cn": "岩石族"
			},
			"Sea Serpent": {
				"cn": "海龙族"
			},
			"Spellcaster": {
				"cn": "魔法使族"
			},
			"Thunder": {
				"cn": "雷族"
			},
			"Warrior": {
				"cn": "战士族"
			},
			"Winged Beast": {
				"cn": "鸟兽族"
			},
			"Wyrm": {
				"cn": "幻龙族"
			},
			"Zombie": {
				"cn": "不死族"
			}, "Tuner": {
				"cn": "调整"
			},
			"Gemini": {
				"cn": "二重"
			},
			"Flip": {
				"cn": "反转"
			},
			"Toon": {
				"cn": "卡通"
			},
			"Spirit": {
				"cn": "灵魂"
			},
			"Union": {
				"cn": "同盟"
			},
			"Special Summon": {
				"cn": "特殊召唤"
			}, "Normal": {
				"cn": "通常"
			},
			"Effect": {
				"cn": "效果"
			},
			"Fusion": {
				"cn": "融合"
			},
			"Ritual": {
				"cn": "仪式"
			},
			"Synchro": {
				"cn": "同调"
			},
			"Xyz": {
				"cn": "超量"
			},
			"Pendulum": {
				"cn": "灵摆"
			},
			"Link": {
				"cn": "连接"
			},
			"Token": {
				"cn": "衍生物"
			}
		}



		// 解析请求的URL和查询参数
		const url = new URL(request.url);
		const queryParams = new URLSearchParams(url.search);
		const supportLanguage = ['cn']

		// 检查language参数是否为cn
		let language = queryParams.get('language');
		if (language != null) {
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
						let changeType = []
						for (let typeline of card.typeline) {
							let newType = typeData[typeline][language]
							if (typeline == null) {
								changeType.push(typeline)
							} else {
								changeType.push(newType)
							}

						}
						if (card.typeline != null) {
							card.typeline = changeType
						}

					} else {

						this.fetchAndExtractCardInfo(card.id, request)
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
	async fetchAndExtractCardInfo(searchParam, request) {

		// 构建请求的 URL
		const url = `https://ygocdb.com/?search=${encodeURIComponent(searchParam)}`;

		try {
			// 发起请求获取 HTML 内容
			const response = await fetch(url, { headers: request.headers, });
			console.log("断言2")



			if (!response.ok) {
				throw new Error(`请求失败，状态码: ${response.status}`);
			}

			// 获取 HTML 文本
			const htmlString = await response.text();

			// 创建一个临时的 div 元素来解析 HTML 字符串
			const tempDiv = document.createElement('div');
			tempDiv.innerHTML = htmlString;

			// 找到目标 div
			const descDiv = tempDiv.querySelector('.desc');
			if (!descDiv) {
				throw new Error('未找到 .desc 元素');
			}

			// 提取卡片名称
			const cardNameElement = descDiv.querySelector('strong.name span');

			if (!cardNameElement) {
				throw new Error('未找到卡片名称元素');
			}
			const cardName = cardNameElement.textContent.trim();

			// 提取 <hr> 标签下的所有文字
			const hrElement = descDiv.querySelector('hr');
			if (!hrElement) {
				throw new Error('未找到 <hr> 元素');
			}

			// 获取 <hr> 标签后的所有文本内容
			let textAfterHr = '';
			let currentNode = hrElement.nextSibling;
			while (currentNode) {
				if (currentNode.nodeType === Node.TEXT_NODE) {
					textAfterHr += currentNode.textContent.trim() + ' ';
				}
				currentNode = currentNode.nextSibling;
			}

			// 返回提取的信息
			return {
				cardName: cardName,
				textAfterHr: textAfterHr.trim()
			};
		} catch (error) {
			console.log('发生错误:', error);
			return null;
		}
	}
};