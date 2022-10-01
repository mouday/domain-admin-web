npm run build && \

rsync -r dist/* root@81.70.84.217:/data/wwwroot/jutu-project/jutu-design2 && \

echo '部署完成'
echo '**************************************'
echo '       https://www.jutu.cn/design2 '
echo '**************************************'
