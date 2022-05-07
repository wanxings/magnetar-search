export function translateTitle(title) {
  if (this.$te(`magnetarI18n.${title}`)) return this.$t(`magnetarI18n.${title}`)
  return title
}
