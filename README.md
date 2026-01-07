# YouTube Shorts Converter

YouTube Shorts 링크를 iframe embed 코드로 변환하는 간단한 웹 애플리케이션입니다.

## 기능

- YouTube Shorts URL에서 비디오 ID 자동 추출
- iframe embed 코드 생성
- 생성된 코드 복사 기능
- 실시간 미리보기

## 사용 방법

1. YouTube Shorts 링크를 입력 필드에 붙여넣기
2. "변환" 버튼 클릭
3. 생성된 iframe 코드를 복사하여 사용

## 예시

입력: `https://youtube.com/shorts/VIDEO_ID`

출력:
```html
<iframe width="560" height="315" src="https://www.youtube.com/embed/VIDEO_ID" title="YouTube video player" style="border: 0;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" loading="lazy"></iframe>
```

## 개발

```bash
npm install
npm run dev
```

## 빌드

```bash
npm run build
```

## 배포

Vercel을 통해 배포할 수 있습니다. 프로젝트를 Vercel에 연결하면 자동으로 배포됩니다.
