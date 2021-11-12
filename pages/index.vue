<template>
	<div>
		<form>
			<label for="input">Pokemon name or ID: </label>
			<input
				id="input"
				v-model="input"
			>
			<Prefetch :url="`https://pokeapi.co/api/v2/pokemon/${input}`">
				<NuxtLink :to="`/${input}`">
					<button type="submit">Find</button>
				</NuxtLink>
			</Prefetch>
		</form>
	</div>
</template>

<script>
import { Prefetch } from '@layer0/vue'
export default {
	components: { Prefetch },
	data: () => ({
		input: ''
	})
}
</script>
