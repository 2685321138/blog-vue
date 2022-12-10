<template>
  <!-- 文章 -->
  <div>
    <div class="banner" :style="cover">
      <div class="article-info-container">
        <div class="article-title">{{ article.title }}</div>
        <div class="article-info">
          <div class="first-time">
            <span>
              <i class="iconfont iconrili" />
              发表于 {{ formatter(article.createTime) }}
            </span>
            <span class="separator">|</span>
            <span>
              <i class="iconfont icongengxinshijian" />
              更新于
              <template v-if="article.updateTime">
                {{ formatter(article.updateTime) }}
              </template>
              <template v-else>
                {{ formatter(article.createTime)}}
              </template>
            </span>
            <span class="separator">|</span>

            <span class="article-category">
              <i class="iconfont iconfenlei1" />
              <router-link :to="'/categories/' + article.typeId">
                {{ article.typeName }}
              </router-link>
            </span>
          </div>
          <div class="second-time">
            <span>
              <i class="iconfont iconzishu" />
              字数统计: {{ wordNum }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <el-row class="article-container clear">
        <el-col :span="16">
          <el-card class="article-wrapper">
            <div id="article">
              <div class="markdown-body" id="test" v-html="article.context"></div>
            </div>
          </el-card>
        </el-col>
      <el-col :span="7" class="d-md-block d-none" >
        <div style="position: sticky;top: 10px">
          <el-card class="article-wrapper">
            <div class="right-title">
              <i class="iconfont iconhanbao" style="font-size:16.8px" />
              <span style="margin-left:10px">目录</span>
            </div>
            <div id="toc" class="toc" />
          </el-card>
          <el-card style="margin-top: 10px">
            <i class="iconfont icongengxinshijian" style="font-size:16.8px" />
            <span style="margin-left:10px">相关文章</span>
              <div class="articleRecommmend-List">
                <div class="articleRecommend-item"
                  v-for="(item,index) in article.articleRecommendList"
                     :key="index"
                >
                  <router-link :to="'/Article/' + item.id" class="context-photo">
                    <img :src="item.photo" />
                  </router-link>
                  <div class="context">
                    <div class="context-title">
                      <router-link :to="'/Article/' + item.id">
                        {{ item.title }}
                      </router-link>
                    </div>
                    <div class="context-time">{{ formatter(item.createTime) }}</div>
                  </div>
                </div>
              </div>
          </el-card>
        </div>
      </el-col>
    </el-row>


  </div>
</template>

<script>
import tocbot from 'tocbot'

import {getArticleById} from '@/api/Article'
export default {
  name: 'Article',
  data() {
    return {
      article: {},
      photo:'',
      wordNum:'',
    };
  },
  // components:{
  //   ElMessage,
  // },
  computed:{
    cover(){
      return  "background: url(" +
          this.article.photo +
          ") center center / cover no-repeat"
    }
  },
  created() {
    this.getArticle()
  },
  async mounted() {


  },
  beforeDestroy() {
    tocbot.destroy();
  },
  methods: {
    formatter (row) {
      const zoneDate = new Date(row).toJSON()
      const date = new Date(+new Date(zoneDate) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
      return date
    },
    getArticle(){
      let route = this.$route.path.lastIndexOf("/")
      let params = this.$route.path.substring(route+1)
      getArticleById(params).then(res=>{
        this.article = res.data
        this.wordNum = this.HtmlRemoveTag(res.data.context).length;
        this.$nextTick(() => {
          const _this = this
          const code = document.querySelectorAll('pre code');
          //由于wangeditor生成的h1没有id属性
          //tocbot是根据id来进行定位的,如下代码解决锚点定位问题
          document.querySelectorAll('.markdown-body h1').forEach((item,index)=>{
            item.id = item.innerText
          })
          code.forEach((item) => {
            // 取出 code 的父元素 pre（后面方便使用）
            let pre = item.parentElement;

            // 添加拖动属性
            this.dragAround(item);

            // 新建元素 代码块序号
            let lineNumBox = document.createElement('div');
            lineNumBox.setAttribute('style', 'height: ' + item.offsetHeight + 'px');
            lineNumBox.className = 'line-num-box';
            // 插入序号 计算方式：获取code元素的高并除以行高，得到行数，根据行数插入序号
            let num = '';  // 设行高二十
            for (let i = 1; i <= Math.ceil(item.offsetHeight / 20); i++) {
              num += i + '\n'; // 序号加上换行符
            }
            lineNumBox.innerText = num;// 插入序号
            item.parentElement.insertBefore(lineNumBox, item);

            let codeBox = document.createElement('div');
            codeBox.className = 'code-box';
            codeBox.appendChild(item);

            pre.appendChild(codeBox);

            let lang = pre.lastElementChild.firstElementChild.className;
            let icon = `<div class="mac-icon">` +
                `<span class="mac-icon-red"></span>` +
                `<span class="mac-icon-yellow"></span>` +
                `<span class="mac-icon-green"></span>` +
                `<span class="mac-icon-lang">${lang.split('-')[1].toUpperCase()}</span>` +
                `<button class="copy-button">复制</button>` +
                `<button class="full-screen-button">全屏</button>` +
                `</div>`;
            pre.insertAdjacentHTML('afterbegin', icon);

            // 获取复制元素
            let copyButton = pre.firstElementChild.getElementsByClassName('copy-button')[0];
            copyButton.onclick = function () {
              const copyPromise = navigator.clipboard.writeText(pre.lastElementChild.innerText);
              copyPromise.then(() => {
                _this.$message.success("复制成功")
              }).catch((ex) => {
                _this.$message.error("复制失败")
              });

            };

            // 获取全屏按钮元素
            let fullScreenButton = pre.firstElementChild.getElementsByClassName('full-screen-button')[0];
            fullScreenButton.onclick = function () {
              // 此写法基于 pre 元素没有其他任何类名的情况下
              if (pre.className === 'pre-full-screen') {
                this.innerText = '全屏';
                pre.className = '';
                pre.setAttribute("title","");
              } else {
                this.innerText = '关闭';
                pre.className = 'pre-full-screen';
                pre.setAttribute("title","双击关闭全屏");
              }
            };
            // 双击关闭全屏
            pre.ondblclick = function () {
              fullScreenButton.innerText = '全屏';
              // 此写法基于 pre 元素没有其他任何类名的情况下
              this.className = '';
              pre.setAttribute("title","");
            };
            hljs.highlightBlock(codeBox.firstElementChild);
          });
          tocbot.init({
            tocSelector: "#toc", //要把目录添加元素位置，支持选择器
            contentSelector: "#article", //获取html的元素
            headingSelector: "h1", //要显示的id的目录
            hasInnerContainers: true,
            onClick: function(e) {
              e.preventDefault();
            }
          });
        });
        console.log("结果",res)
      })
    },
    //清除html标签
    HtmlRemoveTag (str) {
      return str ? str.replace(/<[^>]+>/g,"") : ''
    },
    // 给某个元素添加左右拖动属性
    dragAround(anyElement) {
      let mouseDown = false; // 鼠标是否按下
      let x = 0; // 鼠标点击的下标
      let left = 0; // 当前滚动条位置
      anyElement.onmousedown = function (e) {
        mouseDown = true;       // 鼠标按下
        x = e.clientX;          // 获取鼠标点击位置 （x坐标）
        left = this.scrollLeft; // 滚动条当前位置
      };
      anyElement.onmousemove = function (e) {
        // 鼠标按下
        if (mouseDown) {
          let curX = e.clientX; // 鼠标移动到当前的位置
          let diffX = curX - x; // 鼠标移动距离（当前位置 减去之前的位置）
          this.scrollLeft = left - diffX;
        }
      };
      anyElement.onmouseup = function () {
        mouseDown = false;
      };
      anyElement.onmouseleave = function () {
        mouseDown = false;
      };
    },
  },
};
</script>

<style scoped>
.banner{
  top: 50px;
}
.clear{
  padding-top: 20px;
}
.el-col{
  border-radius: 4px;
  margin-right: 5px;
}
.article-info i {
  font-size: 14px;
}
.article-info {
  color: white;
  font-size: 14px;
  line-height: 1.9;
  display: inline-block;
}
ol{
  padding-left: 0px !important;
}
a:hover{
  text-decoration: none !important;
}
.banner:before{
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height:100%;
}
.article-info-container{
  position: absolute;
  bottom: 6.25rem;
  padding: 0 8%;
  width: 100%;
  text-align: center;
}
.article-info-container a{
  text-decoration: none;
  color: white;
  transition: all 0.3s;
}
a:hover{
  color: #8e8cd8;
}
.article-title {
  font-size: 35px;
  color: white;
  margin: 20px 0 8px;
}
.right-title {
  display: flex;
  align-items: center;
  line-height: 2;
  font-size: 16.8px;
  margin-bottom: 6px;
}
.right-title i {
  font-weight: bold;
}
.context {
  flex: 1;
  padding-left: 10px;
  word-break: break-all;
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
}
.context-title a {
  transition: all 0.2s;
  font-size: 95%;
}
.context-title a:hover {
  color: #2ba1d1;
}
.context-time {
  color: #858585;
  font-size: 85%;
  line-height: 2;
}
.context-photo {
  width: 58.8px;
  height: 58.8px;
  overflow: hidden;
}
.articleRecommmend-List{
  margin-top: 10px;
}
.articleRecommend-item {
  display: flex;
  align-items: center;
  padding: 6px 0;
}
.articleRecommend-item:first-child {
  padding-top: 0;
}
.articleRecommend-item:last-child {
  padding-bottom: 0;
}
.articleRecommend-item:not(:last-child) {
  border-bottom: 1px dashed #f5f5f5;
}
.articleRecommend-item img {
  width: 100%;
  height: 100%;
  transition: all 0.6s;
  object-fit: cover;
}
.articleRecommend-item img:hover {
  transform: scale(1.1);
}


>>> pre {
  border: 1px solid red;
  background-color: #1e1e1e !important;
  border-radius: 15px !important;
}

/* 自定义全屏样式 */
>>> .pre-full-screen {
  position: fixed;
  left: 0 !important;
  top: 0 !important;
  width: 100vw !important;
  z-index: 100;
  height: 100vh !important;
}

>>> .line-num-box {
  display: inline-block;
  color: white;
  border-right: 2px solid white;
  line-height: 20px !important;
  font-size: 16px !important;
  text-align: right;
  padding-left: 10px;
  padding-right: 10px;
}

>>> .code-box {
  display: inline-block;
  vertical-align: top;
  width: calc(100% - 50px);
  border-left-style: none;
}

/*滚动条样式 https://m.php.cn/article/475268.html*/
>>> code {
  line-height: 20px !important;
  font-size: 16px !important;
  vertical-align: top;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  padding-left: 10px !important;
  color: white !important;
}



>>> .mac-icon {
  border-bottom: 1px solid silver;
  margin-bottom: 5px;
  color: deeppink;
}

>>> .mac-icon > span {
  display: inline-block;
  letter-spacing: 5px;
  word-spacing: 5px;
  width: 16px;
  height: 16px;
  border-radius: 8px;
}

>>> .mac-icon-red {
  background-color: red;
}

>>> .mac-icon-yellow {
  margin-left: 10px;
  background-color: yellow;
}

>>> .mac-icon-green {
  margin-left: 10px;
  background-color: green;
}

>>> .mac-icon-lang {
  width: 50px !important;
  padding-left: 10px;
  font-size: 16px;
  vertical-align: top;
}

>>> .copy-button, >>> .full-screen-button {
  width: 40px;
  height: 20px;
  background-color: wheat;
  margin-bottom: 3px;
  border-radius: 5px;
  outline: none;
  border: none;
}

>>> .full-screen-button {
  width: 40px !important;
  height: 20px;
}

>>> .copy-button {
  /*
      减去padding 2*16（如果使box-sizing: border-box;则不用减去)，
      减去图标 3*16
      图标间隙 10*2
      语言 宽度 50px
      减去本身宽 40px
      全屏按钮 margin-left 10px
      全屏按钮宽 40px
  */
  margin-left: calc(100% - 208px);
}

>>> .full-screen-button {
  margin-left: 10px;
}

>>> .copy-button:hover, >>> .full-screen-button:hover {
  background-color: white;
}
.el-message__icon {
  position: absolute !important;
}
</style>

