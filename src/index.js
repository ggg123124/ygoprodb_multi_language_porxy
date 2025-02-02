export default {
	async fetch(request, env, ctx) {
		let typeData = {
			"Aqua": {
				"cn": "水族",
				"ja": "水族",
				"ko": "물족",
				"es": "Aqua"
			},
			"Beast": {
				"cn": "兽族",
				"ja": "獣族",
				"ko": "야수족",
				"es": "Bestia"
			},
			"Beast-warrior": {
				"cn": "兽战士族",
				"ja": "獣戦士族",
				"ko": "야수전사족",
				"es": "Guerrero-Bestia"
			},
			"Creator-god": {
				"cn": "创造神",
				"ja": "創造神族",
				"ko": "창조신족",
				"es": "N/A" // 原始列表中没有直接对应项
			},
			"Cyberse": {
				"cn": "电子界族",
				"ja": "サイバース族",
				"ko": "사이버스족",
				"es": "Ciberso"
			},
			"Dinosaur": {
				"cn": "恐龙族",
				"ja": "恐竜族",
				"ko": "공룡족",
				"es": "Dinosaurio"
			},
			"Divine-Beast": {
				"cn": "幻神兽族",
				"ja": "幻神獣族",
				"ko": "환신야수족",
				"es": "Bestia Divina"
			},
			"Dragon": {
				"cn": "龙族",
				"ja": "ドラゴン族",
				"ko": "드래곤족",
				"es": "Dragón"
			},
			"Fairy": {
				"cn": "天使族",
				"ja": "天使族",
				"ko": "천사족",
				"es": "Hada"
			},
			"Fiend": {
				"cn": "恶魔族",
				"ja": "悪魔族",
				"ko": "악마족",
				"es": "Demonio"
			},
			"Fish": {
				"cn": "鱼族",
				"ja": "魚族",
				"ko": "어류족",
				"es": "Pez"
			},
			"Insect": {
				"cn": "昆虫族",
				"ja": "昆虫族",
				"ko": "곤충족",
				"es": "Insecto"
			},
			"Machine": {
				"cn": "机械族",
				"ja": "機械族",
				"ko": "기계족",
				"es": "Máquina"
			},
			"Plant": {
				"cn": "植物族",
				"ja": "植物族",
				"ko": "식물족",
				"es": "Planta"
			},
			"Psychic": {
				"cn": "念动力族",
				"ja": "サイキック族",
				"ko": "사이킥족",
				"es": "Psíquico"
			},
			"Pyro": {
				"cn": "炎族",
				"ja": "炎族",
				"ko": "화염족",
				"es": "Piro"
			},
			"Reptile": {
				"cn": "爬虫类族",
				"ja": "爬虫類族",
				"ko": "파충류족",
				"es": "Reptil"
			},
			"Rock": {
				"cn": "岩石族",
				"ja": "岩石族",
				"ko": "암석족",
				"es": "Roca"
			},
			"Sea Serpent": {
				"cn": "海龙族",
				"ja": "海竜族",
				"ko": "해룡족",
				"es": "Serpiente Marina"
			},
			"Spellcaster": {
				"cn": "魔法使族",
				"ja": "魔法使い族",
				"ko": "마법사족",
				"es": "Lanzador de Conjuros"
			},
			"Thunder": {
				"cn": "雷族",
				"ja": "雷族",
				"ko": "번개족",
				"es": "Trueno"
			},
			"Warrior": {
				"cn": "战士族",
				"ja": "戦士族",
				"ko": "전사족",
				"es": "Guerrero"
			},
			"Winged Beast": {
				"cn": "鸟兽族",
				"ja": "鳥獣族",
				"ko": "비행야수족",
				"es": "Bestia Alada"
			},
			"Wyrm": {
				"cn": "幻龙族",
				"ja": "幻竜族",
				"ko": "환룡족",
				"es": "Wyrm"
			},
			"Zombie": {
				"cn": "不死族",
				"ja": "アンデット族",
				"ko": "언데드족",
				"es": "Zombi"
			},
			"Tuner": {
				"cn": "调整",
				"ja": "チューナー",
				"ko": "튜너",
				"es": "Cantante" // 请注意，“Cantante”在原列表中意为“歌手”，这里可能是根据上下文进行了最接近的匹配。
			},
			"Illusion": {
				"cn": "幻想魔族",
				"ja": "幻想魔族",
				"ko": "환상마족",
				"es": "Ilusión"
			},
			"Gemini": {
				"cn": "二重",
				"ja": "デュアル",
				"ko": "듀얼",
				"es": "Géminis"
			},
			"Flip": {
				"cn": "反转",
				"ja": "リバース",
				"ko": "리버스",
				"es": "Volteo"
			},
			"Toon": {
				"cn": "卡通",
				"ja": "トゥーン",
				"ko": "툰",
				"es": "Toon"
			},
			"Spirit": {
				"cn": "灵魂",
				"ja": "スピリット",
				"ko": "스피릿",
				"es": "Spirit" // 注意：这与英文相同，可能需要确认是否准确或有对应的西班牙语术语。
			},
			"Union": {
				"cn": "同盟",
				"ja": "ユニオン",
				"ko": "유니온",
				"es": "Unión"
			},
			"Special Summon": {
				"cn": "特殊召唤",
				"ja": "特殊召喚",
				"ko": "특수 소환",
				"es": "N/A" // 原始列表中没有直接对应项
			},
			"Normal": {
				"cn": "通常",
				"ja": "通常",
				"ko": "일반",
				"es": "Normal"
			},
			"Effect": {
				"cn": "效果",
				"ja": "効果",
				"ko": "효과",
				"es": "Efecto"
			},
			"Fusion": {
				"cn": "融合",
				"ja": "融合",
				"ko": "융합",
				"es": "Fusión"
			},
			"Ritual": {
				"cn": "仪式",
				"ja": "儀式",
				"ko": "의식",
				"es": "Ritual"
			},
			"Synchro": {
				"cn": "同调",
				"ja": "シンクロ",
				"ko": "싱크로",
				"es": "Sincronía"
			},
			"Xyz": {
				"cn": "超量",
				"ja": "エクシーズ",
				"ko": "엑시즈",
				"es": "Xyz"
			},
			"Pendulum": {
				"cn": "灵摆",
				"ja": "ペンデュラム",
				"ko": "펜듈럼",
				"es": "Péndulo"
			},
			"Link": {
				"cn": "连接",
				"ja": "リンク",
				"ko": "링크",
				"es": "Enlace"
			}
		}



		// 解析请求的URL和查询参数
		const url = new URL(request.url);
		const queryParams = new URLSearchParams(url.search);
		const supportLanguage = ['cn', 'ja', 'ko', 'es']

		// 检查language参数是否为cn
		let language = queryParams.get('language');
		if (language != null) {
			language = language.toLowerCase();
		}


		if (supportLanguage.includes(language)) {
			queryParams.delete('language'); // 移除language参数
		}

		// 构造目标URL
		const targetUrl = `https://db.ygoprodeck.com/api/v7/cardinfo.php?${queryParams.toString()}&misc=yes`;

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
						'SELECT name, desc FROM multi_language_card_v2 WHERE card_id = ? AND language = ?'
					)
						.bind(card.id, language)
						.first();

					if (dbResult) {
						card.name = dbResult.name; // 替换name
						card.desc = dbResult.desc; // 替换desc
					}
					//如果数据库里没数据的话
					else {
						let data = null
						if (language === 'cn') {
							data = await this.fetchAndExtractCardInfo(card.id, request)
						} else {
							if (card.misc_info[0].konami_id == null) {

								let test = await this.fetchAndExtractCardInfo(card.id, request)
								card.misc_info[0].konami_id = test.konamiId

							}
							if (card.misc_info[0].konami_id != null) {
								data = await this.fetchAndProcessCardText(card.misc_info[0].konami_id, language)
							}

						}
						// console.log(data)
						if (data != null && data.cardName != null && data.cardName != "" && data.dest != null && data.dest != "") {
							card.name = data.cardName
							card.desc = data.dest
							await env.DB.prepare(
								"INSERT INTO multi_language_card_v2 ( card_id, name, desc, language) VALUES (?, ?, ?, ?)"
							).bind(card.id, card.name, card.desc, language).run()
						}


					}
					let changeType = []
					if ("typeline" in card) {
						for (let typeline of card.typeline) {
							if (typeline === "Pendulum" && card.desc.indexOf("\r\n\r\n") != -1) {
								card.pend_desc = card.desc.split('\r\n\r\n')[0]
								card.monster_desc = card.desc.split('\r\n\r\n')[1]
							}


							let newType = typeData[typeline][language]

							if (newType != null && newType !== "N/A") {
								changeType.push(newType)
							} else {
								changeType.push(typeline)

							}

						}

						card.typeline = changeType
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
		const url = `https://ygocdb.com/card/${encodeURIComponent(searchParam)}`;
		let cardName;
		let konamiId
		let dest
		try {
			// 发起请求获取 HTML 内容

			const response = await fetch(url, {
				headers: request.headers,
			});
			console.log("断言3")



			if (!response.ok) {
				throw new Error(`请求失败，状态码: ${response.status}`);
			}

			// 获取 HTML 文本
			const htmlString = await response.text();
			const pattern = /<h2><span lang="zh-Hans">(.*?)<\/span>/;
			const konamiIdPattern = /<span class="cid text-muted" title="数据库编号">(.*?)<\/span>/
			const konamiIdMatch = htmlString.match(konamiIdPattern)
			if (konamiIdMatch) {
				konamiId = konamiIdMatch[1]
				console.log(konamiId); // 输出: 篝火
			}

			const match = htmlString.match(pattern);

			if (match) {
				cardName = match[1]
				console.log(match[1]); // 输出: 篝火
			}

			const destPattern = /<div class="desc" lang="zh-Hans">[\s\S]*?<hr>([\s\S]*?)<\/div>/;
			const destMatch = htmlString.match(destPattern);
			if (destMatch) {
				dest = destMatch[1].trim().replaceAll("<br>", "\n\r")
				dest = dest.replaceAll('<hr>', "")
				dest = dest.replaceAll(/<a.*?>/g, "")
				dest = dest.replaceAll(/<.*?a>/g, "")
				// console.log(dest); // 输出匹配到的内容
			}



			// console.log(htmlString)

			// 返回提取的信息
			return {
				cardName: cardName,
				dest: dest,
				konamiId: konamiId
			};
		} catch (error) {
			console.log('发生错误:', error);
			return null;
		}
	},

	async fetchAndProcessCardText(cid, request_locale = 'ja') {
		console.log(cid)
		const targetUrl = `https://www.db.yugioh-card.com/yugiohdb/card_search.action?ope=2&cid=${cid}&request_locale=${request_locale}`;

		try {
			const response = await fetch(targetUrl);
			const html = await response.text();

			// 改进后的正则表达式
			const extractor = {
				// 匹配 pen_effect 部分（含嵌套结构）
				part1: /<div class="frame pen_effect">[\s\S]*?<div class="item_box_text">([\s\S]*?)<\/div>/i,

				// 匹配 CardText 部分（跳过text_title）
				part2: /<div class="CardText">[\s\S]*?<div class="item_box_text">[\s\S]*?<div class="text_title">[\s\S]*?<\/div>([\s\S]*?)<\/div>/i,
				part3: /<meta name="keywords"\s+content="([^"]+)"\s*\/?>/i

			};

			// 增强版内容提取函数
			const extractContent = (regex) => {
				const match = html.match(regex);
				if (!match) return '';

				// 清理内容：去除HTML标签、压缩空白、处理特殊符号
				return match[1]
					.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '')  // 移除所有HTML标签
					.replace(/\s+/g, ' ')       // 压缩连续空白
					.replace(/&nbsp;/g, ' ')    // 处理空格实体
					.trim();
			};

			// 提取两部分内容
			const [part1, part2] = [
				extractContent(extractor.part1),
				extractContent(extractor.part2)
			];

			// 最终格式处理
			const formatText = (text) =>
				text.replace(/<br\s*\/?>/gi, '\r\n')  // 保留已有的换行处理
					.replace(/(\r\n)+/g, '\r\n');     // 合并连续换行

			let combinedText;
			if (part1 && part2) {
				combinedText = [formatText(part1), formatText(part2)].join('\r\n\r\n');
			} else if (part1 || part2) {  // 如果只有一个有值
				combinedText = formatText(part1 || part2);
			} else {
				combinedText = ''; // 如果两者都没有数据
			}

			const pattern = /<meta name="keywords"\s+content="([^"]+)"\s*\/?>/i;
			const match = pattern.exec(html);
			let firstKeyword = ""
			if (match) {
				// 获取content中的所有内容
				const contentStr = match[1];

				// 使用逗号分割content内容，并获取第一个子字符串
				firstKeyword = contentStr.split(',')[0].trim();
			} else {
				console.log("没有找到匹配的meta标签。");
			}
			console.log(firstKeyword)
			// console.log('处理后的文本内容：\n');
			console.log(combinedText);
			return {
				cardName: firstKeyword,
				dest: combinedText
			};


		} catch (error) {
			console.error('处理错误：', error);
			throw error;
		}
	}
};