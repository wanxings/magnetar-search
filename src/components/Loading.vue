<template>
	<div class="demo-spin-container">
		<Spin fix>
			<Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
			<div>{{loadingtext}}</div>
		</Spin>
	</div>
</template>
<script>
	export default {
		props: ["loadingtext"],
	}
</script> 
<style>
	.demo-spin-container {
		display: inline-block;
		width: 100%;
		height: 400px;
		position: relative;
	}

	.demo-spin-icon-load {
		animation: ani-demo-spin 1s linear infinite;
	}
</style>
