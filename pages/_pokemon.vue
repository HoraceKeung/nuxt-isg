<template>
	<div class="capitalize">
		<NuxtLink to="/">
			<button tabindex="-1">Back</button>
		</NuxtLink>
		<p v-if="$fetchState.pending">Loading...</p>
		<p v-else-if="$fetchState.error">Error</p>
		<template v-else-if="pokemon">
			<img
				:src="pokemon.sprites.front_default"
				:alt="pokemon.name"
			>
			<p>Name: {{pokemon.name}}</p>
			<p>Types: {{typeNames.join(', ')}}</p>
			<p>Height: {{pokemon.height}}</p>
			<p>Weight: {{pokemon.weight}}</p>
			<p
				v-for="(s, index) in pokemon.stats"
				:key="`stat-${index}`"
			>
				{{s.stat.name}}: {{s.base_stat}}
			</p>
		</template>
	</div>
</template>

<script>
export default {
	async fetch () {
		this.pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.$route.params.pokemon}`).then(r => r.json())
	},
	data: () => ({
		pokemon: null
	}),
	computed: {
		typeNames () {
			return this.pokemon?.types?.map(t => t.type.name) || []
		}
	},
	head () {
		const title = this.pokemon?.name
		const description = `A ${this.typeNames.join(' and ')} type pokemon`
		const image = this.pokemon?.sprites.front_default
		return {
			title,
			meta: [
				{ hid: 'title', name: 'title', property: 'title', content: title },
				{ hid: 'og:title', name: 'og:title', property: 'og:title', content: title },
				{ hid: 'description', name: 'description', property: 'description', content: description },
				{ hid: 'og:description', name: 'og:description', property: 'og:description', content: description },
				{ hid: 'image', name: 'image', property: 'image', content: image },
				{ hid: 'og:image', name: 'og:image', property: 'og:image', content: image }
			]
		}
	}
}
</script>
