<template>
	<div id="polymerization">
		<Modal v-model="polymerization" width="360" class-name="ivu-modal-dis" :on-visible-change="pclose" >
			<p slot="header" style="text-align:center;">
				<span>温馨提示</span>
			</p>
			<div style="text-align:center;border:none">
				<p>Magnetar没有收录相关的资源</p>
				<p>是否尝试使用聚合搜索？</p>
			</div>
			<div slot="footer" style="text-align:center">
				<Button type="primary" @click="psearch('all')">综合</Button>
				<Button type="primary" @click="psearch('en')">英文</Button>
				<Button type="primary" @click="psearch('dm')">动漫</Button>
				<Button type="primary" @click="psearch('fh')">番号</Button>

			</div>
		</Modal>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				polymerization:true
			}
		},
		methods:{
			psearch(val){
				this.$emit("psearch",val)
			},
			pclose(val){
				this.polymerization = true;
				if(val == false){
					this.$emit("psearchclose")
				}
				
			}
		}
	}
</script>

<style>

</style>
