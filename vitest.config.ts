import { defineConfig } from 'vitest/config'
import Vue from "@vitejs/plugin-vue"
import json_summary from 'json-summary'

export default defineConfig({
  plugins: [Vue()],
  test: {
    environment: "happy-dom",
    reporters: ['github-actions', 'json'],
  }
})
