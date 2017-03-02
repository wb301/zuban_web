<template>
    <div>
        <div class="container-body">
            <div class="weui-cells">
                <div class="weui-cell" href="javascript:;">
                    <label class="weui-label class_font_size_hd">金额</label>
                    <input class="weui-input" v-model="categor" type="text" />
                    <label>全部提现</label>
                </div>
                <div class="weui-cell" href="javascript:;">
                    <label class="weui-label class_font_size_hd">收支明细</label>
                    <input class="weui-input disabled-input class_font_size_bd" v-model="categor" type="text" />
                    <div><img :src="arrow" style="width:15px;height:15px;" /></div>
                </div>
            </div>
        </div>
        </div>
</template>
<style lang="less" scoped>
</style>
<script>
</script>
