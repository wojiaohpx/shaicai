<template>
  <jroll-infinite class="jp-control" id="jp-jroll2">
    <ul class="mui-table-view show">
      <li class="mui-table-view-cell" v-for="item in info">
        <div class="title">
          <div class="titles">
            <img  :src="'http://'+$store.state.urlIp+'/'+item.c_img" :alt="type[item.c_id].name">
            <span class="name" v-text="type[item.c_id].name"></span>
            <span class="mui-badge yellow" v-text="status[item.status]" ></span>
          </div>
        </div>
        <ul class="list-data">
          <li>
            <span class="data-title">任务返利</span>
            <span class="datas"><span class="red">{{item.money}}</span>元</span>
          </li>
          <li class="icon-list">
            <span class="data-title">报单人</span>
            <span class="datas">{{item.name}} {{item.phone}}</span>
            <router-link :to="{ name: 'Dotask2', params: { userId: item.id }}" >查看</router-link>
          </li>
          <li>
            <span class="data-title">报单时间</span>
            <span class="datas" >{{item.add_time | formatDate}}</span>
          </li>
        </ul>
      </li>

    </ul>
  </jroll-infinite>

</template>

<script type="text/ecmascript-6">
  //formatDate时间戳转换
  import {formatDate} from '../../style/js/time'

  var _this2 = {} //用于储存vue数据的this
  var _page2 = ''
  export default {
    name : 'audit',
    data(){
      return {
        token1:this.$store.state.user.token,
        info: [],
        type: [],
        status:[],
        total_page : '',
        operation: ''
      }
    },
    created(){
      _this2 = this
      this.$http.get('http://'+this.$store.state.urlIp+'/api/user/task/status/0', {params: {token: this.token1}}).then(response => {
        this.info = response.body.list
        this.type = response.body.c_name
        this.total_page = response.body.t_page
        this.status = response.body.status_arr

        //判断数据是否有数据，有则刷新，没有的话禁止滚动
        var jroll = new JRoll("#jp-jroll2");
        //do something，例：动态修改scroller的内容，使scroller的高度发生变化
        if(this.info.length === 0){
          jroll.disable()
        }

      })
    },
    activated(){
      var jroll = new JRoll("#jp-jroll2");
      //do something，例：动态修改scroller的内容，使scroller的高度发生变化
      jroll.refresh();
    },
    filters: {
      formatDate(time) {
        let date = new Date(parseInt(time)*1000);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
      }
    },
    components: {
      'jroll-infinite': JRoll.VueInfinite({
        tip: '<img src="./static/image/006.gif">正在加载...</img>',
        pulldown: {
          refresh: function(complete) {
            //完成加载数据的操作后回调执行complete方法
            complete();
          }
        },
        bottomed: function (complete) {
          var me = this
          var page = _this2.total_page  //获取后台传来的数据页数

          //判断数据是否存在，有则刷新
          if(_this2.info.length === 0){
            me.tip = '暂无数据'
          }else {
            if (me.page === page-1 ) {
              me.tip = '已全部加载完成'
            }else {
              me.tip = '<img class="homeLoding" src="./static/image/006.gif" >正在加载...</img>'
            }
          }

          if (me.page < ( (page === 1)? page = 1 : page = page - 1)) {
            if(typeof complete === 'function'){
              _page2 = 0
              _this2.info = []
            }else {
              _page2 ++
              me.page++
            }

            _this2.$http.get('http://' + this.$store.state.urlIp + '/api/user/task/status/0', {
              params: {
                token: _this2.token1,
                p: _page2+1
              }
            }).then(response => {

              var jons = response.body.list
              if (typeof complete === 'function') {
                _this2.info = _this2.info.concat(jons)
                me.page = 0
                complete()
              }else{
                _this2.info = _this2.info.concat(jons)
              }

            })
          }

        }
      }, {
        scrollBarY: false,

      })
    },
    //缓存时离开的状态
    deactivated(){
      //在离开的时候把缓冲的_page值还原
      if( _page2 >= this.total_page -1 ){
        _page2 = 0
      }
//      console.log( '我是全部的'+_page + '+' + this.total_page)
    },
    //路由切换后的状态
    beforeDestroy(){
      _page2 = 0
    }
  }


</script>

