# 部署
.PHONY: dep-pro dep-dev dev

# 部署到线上环境
dep-pro:
	npm run build
	bash deploy.sh

# 部署到测试环境
dep-dev:
	npm run build-dev
	bash deploy-dev.sh

# 测试环境
dev:
	npm run dev

# more-copy 创建指令
.PHONY: list edit all

# 定义变量
name = ''
data = ''

# make list name=domain data=./data/domain.js
list:
	mcp list $(name) $(data) list/index.vue index.vue
	mcp list $(name) $(data) list/DataTable.vue DataTable.vue

# make edit name= data=
edit:
	mcp edit $(name) $(data) edit/index.vue index.vue
	mcp edit $(name) $(data) edit/DataForm.vue DataForm.vue
	mcp edit $(name) $(data) edit/config.js config.js
	mcp edit $(name) $(data) edit/DataFormDailig.vue DataFormDailig.vue

# make all name= data=
# eg: $ make all name=domain data=./data/domain.cjs
all:
	make list
	make edit
