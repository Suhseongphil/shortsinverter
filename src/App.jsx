import { useState } from 'react'
import './App.css'

function App() {
  const [url, setUrl] = useState('')
  const [iframeCode, setIframeCode] = useState('')

  const extractVideoId = (url) => {
    // YouTube Shorts URL 패턴: https://youtube.com/shorts/VIDEO_ID 또는 https://www.youtube.com/shorts/VIDEO_ID
    const shortsMatch = url.match(/youtube\.com\/shorts\/([^/?]+)/)
    if (shortsMatch) {
      return shortsMatch[1]
    }
    
    // 일반 YouTube URL 패턴도 지원
    const watchMatch = url.match(/youtube\.com\/watch\?v=([^&]+)/)
    if (watchMatch) {
      return watchMatch[1]
    }
    
    // 짧은 URL 패턴: youtu.be/VIDEO_ID
    const shortMatch = url.match(/youtu\.be\/([^/?]+)/)
    if (shortMatch) {
      return shortMatch[1]
    }
    
    return null
  }

  const handleConvert = () => {
    if (!url.trim()) {
      alert('YouTube URL을 입력해주세요.')
      return
    }

    const videoId = extractVideoId(url)
    
    if (!videoId) {
      alert('올바른 YouTube URL을 입력해주세요.')
      return
    }

    const embedCode = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
    
    setIframeCode(embedCode)
  }

  const handleCopy = () => {
    if (iframeCode) {
      navigator.clipboard.writeText(iframeCode)
      alert('코드가 클립보드에 복사되었습니다!')
    }
  }

  return (
    <div className="container">
      <h1>YouTube Shorts Converter</h1>
      <p className="subtitle">YouTube Shorts 링크를 iframe 코드로 변환합니다</p>
      
      <div className="input-section">
        <input
          type="text"
          placeholder="https://youtube.com/shorts/zuj4XvGdGS4?si=..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleConvert()}
          className="url-input"
        />
        <button onClick={handleConvert} className="convert-btn">
          변환
        </button>
      </div>

      {iframeCode && (
        <div className="result-section">
          <h2>생성된 iframe 코드:</h2>
          <div className="code-container">
            <pre className="code-block">{iframeCode}</pre>
            <button onClick={handleCopy} className="copy-btn">
              복사
            </button>
          </div>
          
          <div className="preview-section">
            <h3>미리보기:</h3>
            <div 
              className="preview"
              dangerouslySetInnerHTML={{ __html: iframeCode }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default App
