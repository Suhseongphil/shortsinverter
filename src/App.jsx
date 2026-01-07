import { useState } from 'react'
import './App.css'

function App() {
  const [url, setUrl] = useState('')
  const [width, setWidth] = useState('')
  const [height, setHeight] = useState('')
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

    // 기본값: 560x315, 입력값이 없으면 기본값 사용
    const iframeWidth = width.trim() && parseInt(width) > 0 ? parseInt(width) : 560
    const iframeHeight = height.trim() && parseInt(height) > 0 ? parseInt(height) : 315

    const embedCode = `<iframe width="${iframeWidth}" height="${iframeHeight}" src="https://www.youtube.com/embed/${videoId}" title="YouTube video player" style="border: 0;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" loading="lazy"></iframe>`
    
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
      
      <div className="size-section">
        <div className="size-input-group">
          <label htmlFor="width">넓이 (기본: 560)</label>
          <input
            id="width"
            type="number"
            placeholder="560"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            min="1"
            className="size-input"
          />
        </div>
        <div className="size-input-group">
          <label htmlFor="height">높이 (기본: 315)</label>
          <input
            id="height"
            type="number"
            placeholder="315"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            min="1"
            className="size-input"
          />
        </div>
      </div>

      <div className="input-section">
        <input
          type="text"
          placeholder="https://youtube.com/shorts/..."
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
