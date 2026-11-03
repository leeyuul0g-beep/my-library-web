import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages 주소(/my-library-web/)에서 열리도록 배포할 때만 base를 바꾼다
export default defineConfig(({ command, isPreview }) => ({
  base: command === 'build' || isPreview ? '/my-library-web/' : '/',
  plugins: [react()],
}))
