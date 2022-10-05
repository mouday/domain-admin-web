# 部署
.PHONY: dep-pro dep-dev dev build

# 部署到线上环境
dep-pro:
	npm run build
	cp -r ./dist/* ../domain-admin/domain_admin/public/

# 部署到测试环境
dep-dev:
	npm run build-dev
	bash deploy-dev.sh

# 测试环境
dev:
	npm run dev

build:
	npm run build

build-visualizer:
	npm run build:visualizer

# more-copy 创建指令
.PHONY: list edit all

# 定义变量
name = ''
data = ''

# make list name=log_scheduler data=./data/log_scheduler.cjs
list:
	mcp list $(name) $(data) list/index.vue index.vue
	mcp list $(name) $(data) list/DataTable.vue DataTable.vue

# make edit name= data=
# make edit name=user-pasword data=./data/user-pasword.cjs
edit:
	mcp edit $(name) $(data) edit/index.vue index.vue
	mcp edit $(name) $(data) edit/DataForm.vue DataForm.vue
	mcp edit $(name) $(data) edit/config.js config.js
	mcp edit $(name) $(data) edit/DataFormDailog.vue DataFormDailog.vue

# make all name= data=
# eg: $ make all name=user-admin data=./data/user.cjs
all:
	make list
	make edit
