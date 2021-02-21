function entry({ puffin: { element, render, style, state } }){

	const wrapperBox = style`
		& {
			position: absolute;
			top: calc(100vh - 200px);
			transform: translateX(calc(50vw - 150px));
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: row;
			width: 300px;
		}
	`
	
	const box = render(element`<div class="${wrapperBox}"/>`, document.body)
	
	const wrapper = style`
		& {
			flex: 1;
			background: rgba(120,120,120,0.25);
			font-size: 25px;
			color: var(--textColor);
			margin: 0 3px;
			height: 100px;
			width: 100px;
			border-radius: 7px;
			text-align: center;
			animation: keyOpening ease-out 0.12s;
			padding: 10px;
		}
		& > h2 {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: norwrap;
			max-width: 100%;
		}
		@keyframes keyClosing {
			from {
				opacity: 1;
				transform: translateY(0px) scale(1);
			}
			to {
				opacity: 0.1;
				transform: translateY(5px) scale(0.98);
			}
		}
		@keyframes keyOpening {
			from {
				opacity: 0.1;
				transform: translateY(5px) scale(0.98);
				
			}
			to {
				opacity: 1;
				transform: translateY(0px) scale(1);
			}
		}
		&.closing{
			animation: keyClosing ease-out 0.12s;
		}
		`
	let showingKeys = []
	window.addEventListener('keyup',(e) => {
		function mounted(){
			setTimeout(() => {
				this.classList.add('closing')
				setTimeout(() => {
					this.remove()
				}, 120)
			}, 800)
			
			showingKeys.push(this)

			if(showingKeys.length > 3){
				showingKeys[0].remove()
				showingKeys.shift()
			}
		}
		const comp = element`
			<div class="${wrapper}" mounted="${mounted}">
				<h2>${e.key}</h2>
			</div>
		`
		render(comp, box)
	})
}

module.exports = {
	entry
}