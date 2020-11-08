const $ = name => document.querySelector(name)
const boxShadow = "0 1px 1px 0 rgba(0, 0, 0, 0.1)"

const products = $(".products")
const header = $("header")

window.addEventListener("scroll", e => {
	if (window.scrollY !== 0) {
		products.style.opacity = 0
		header.style.boxShadow = boxShadow
	} else {
		products.style.opacity = 1
		header.style.boxShadow = "none"
	}
})
