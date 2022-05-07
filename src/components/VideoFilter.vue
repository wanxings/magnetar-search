<template>
	<Select v-model="filetype" style="padding: 11px 0px 0px 10px;" @on-change="changetype" placeholder="排序规则" size="small">
		<Option v-for="item in sortdata" :value="item.value" :key="item.value">{{ item.label }}</Option>
	</Select>
    
</template>
<script>
export default {
	data() {
		return {
			sortdata: [
				{
					value: 'time',
					label: "时间"
				},
				{
					value: 'vate',
					label: "评分"
				}
			],
			filetype: ''
		};
	},
	methods:{
		changetype(val){
			this.filetype = val;
			this.$emit('changetype', val);
		}
	}
};
</script>
<style>
.ivu-select-dropdown {
	max-height: 230px;
}
.ivu-select-selection {
	background-color: transparent;
	border: none;
}
.ivu-select {
	width: auto;
}
.ivu-select-visible .ivu-select-selection {
	border: none;
	box-shadow: none;
}
.ivu-select-single .ivu-select-selection .ivu-select-placeholder {
	color: #70757a;
}
.ivu-select-arrow {
	color: #70757a;
}
.ivu-select-dropdown {
	background-color: var(--w-alpha-90);
}
.ivu-select-item:hover {
	background: var(--b-alpha-5);
}
.ivu-select-item {
	color: #70757a;
}
.ivu-select-single .ivu-select-selection .ivu-select-placeholder,
.ivu-select-single .ivu-select-selection .ivu-select-selected-value {
	font-size: 13px;
	color: #70757a;
}
.ivu-select-item {
	font-size: 13px !important;
	color: #70757a;
}
.ivu-select-item-focus {
	background: var(--b-alpha-10);
}
</style>
