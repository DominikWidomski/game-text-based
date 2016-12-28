const output = document.querySelector('.output');

const structure = {
	start: {
		text: 'Hello traveller, you have some options:',
		actions: [
			['r1', 'Go room 1'],
			['r2', 'Go room 2'],
			['r3', 'Go room 3']
		]
	},
	r1: {
		text: "You're in Room 1",
		actions: [
			['start', 'Go back to start'],
			['r2', 'Go room 2'],
			['r4', 'Go room 4']
		]
	},
	r2: {
		text: "You're in Room 2",
		actions: [
			['start', 'Go to start room'],
			['r1', 'Go room 1'],
			['r3', 'Go room 3'],
			['end', 'Go to final room']
		]
	},
	r3: {
		text: "You're in Room 3",
		actions: [
			['start', 'Go to start room'],
			['r5', 'Go room 5']
		]
	},
	r4: {
		text: "You're in Room 4",
		actions: [
			['r1', 'Go room 1'],
			['end', 'Go to final room']
		]
	},
	r5: {
		text: "You're in Room 5",
		actions: [
			['r3', 'Go room 3'],
			['end', 'Go to final room']
		]
	},
	end: {
		text: "You've reached the final room, no more options, well done!"
	}
};

// @TODO: making use of currentActions hopefully makes it less susceptible to exploits
let currentActions;

function clearActions() {
	document.querySelectorAll('.actions').forEach(elem => {
		elem.innerHTML = elem.innerHTML.replace(/((\<a[^\>]*\>)|(\<\/a\>))/gi, '');
	});
}

function takeAction(action) {
	clearActions();
	goToStage(structure[action]);
}

document.body.addEventListener('click', event => {
	if(event.target.classList.contains('action')) {
		event.preventDefault();
		event.target.parentNode.classList.add('picked');
		takeAction(event.target.dataset.action);
	}
});

function renderActions(actions = []) {
	output.innerHTML += actions.reduce((acc, action) => {
		return acc + `<div><a href="#" class="action" data-action="${action[0]}">${action[1]}</a></div>`;
	}, '<div class="actions">') + '</div>';
}

function renderStageText(stage) {
	output.innerHTML += `<div class="stage-text">${stage.text}</div>`;
}

function goToStage(stage) {
	renderStageText(stage);
	currentActions = stage.actions;
	renderActions(stage.actions);
	window.scrollTo(0, document.body.scrollHeight);
}

goToStage(structure.start);
