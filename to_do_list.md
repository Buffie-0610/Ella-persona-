OpenAI API connectivity
完成條件：本機 .env 可正確讀取 API key，程式能成功取得 OpenAI response。
Minimal Agent
完成條件：不是單純 API call，而是建立最小 agent runtime，可接受 instruction 並回覆。
Persona Seeds
完成條件：從 2025 移植 persona seed 資料，能選擇並載入至少一個 Persona。
Persona Interview
完成條件：學生可以和 Persona 持續對話，Persona 回應符合其 seed identity。
Session Memory
完成條件：同一訪談 session 中，Persona 能記住前文並保持脈絡。
Persistent Facts
完成條件：Persona 能把經確認的 durable facts 保留下來，下一次 session 仍能使用。
Tool Use + Trace
完成條件：Agent 能自主決定是否使用至少一個 tool，並在 trace 中顯示 tool call、結果與 action。
Artifact Inspection
完成條件：學生能提供 concept card、圖片、PDF 或其他 artifact，Persona 可以實際讀取並據此回應。
Prototype Interaction
完成條件：Persona 不只是「評論 prototype」，而是能透過 tools 實際執行受限制的互動，例如選項、開啟細節、提交選擇。
Experience Memory
完成條件：Persona 能記住自己先前與某個學生專案／prototype 的互動經驗，並在之後的 iteration 中引用這段經驗。