# 部署
.PHONY: dep-pro dev build build-visualizer

# 部署到线上环境
# make dep-pro
dep-pro:
	npm run build
	cp -r ./dist/* ../domain-admin/domain_admin/public/

# 测试环境
dev:
	npm run dev

build:
	npm run build

build-visualizer:
	npm run build:visualizer
