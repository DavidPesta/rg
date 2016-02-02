riot.tag2('rg-tags', '<div class="tags"> <span class="tags__container"> <button each="{opts.tags.tags}" onclick="{removeTag}" type="button" class="button button--primary tag"> {text} <span class="tag__close">×</span> </button> </span> <div class="tags__field-container"> <input type="text" name="selectfield" class="field" value="{fieldText}" placeholder="{opts.tags.placeholder}" onkeydown="{handleKeys}" onclick="{toggle}" readonly> <ul class="menu menu--high" if="{opts.tags.isvisible}"> <li each="{opts.tags.options}" onclick="{parent.select}" class="menu__item {\'menu__item--active\': selected, \'menu__item--disabled\': disabled, \'menu__item--hover\': active}"> {text} </li> </ul> </div> </div>', 'rg-tags .menu,[riot-tag="rg-tags"] .menu { position: absolute; }', '', function(opts) {
var _this = this;

if (!opts.tags) opts.tags = { options: [], tags: [] };
if (!opts.tags.options) opts.tags.options = [];
if (!opts.tags.tags) opts.tags.tags = [];

var handleClickOutside = function handleClickOutside(e) {
	if (!_this.root.contains(e.target)) _this.close();
	_this.update();
};

this.handleKeys = function (e) {
	if ([13, 38, 40].indexOf(e.keyCode) > -1 && !opts.tags.isvisible) {
		e.preventDefault();
		_this.open();
		return true;
	}
	if (!opts.tags.isvisible) _this.open();
	var length = opts.tags.options.length;
	if (length > 0 && [13, 38, 40].indexOf(e.keyCode) > -1) {
		e.preventDefault();

		var activeIndex = null;
		for (var i = 0; i < length; i++) {
			var item = opts.tags.options[i];
			if (item.active) {
				activeIndex = i;
				break;
			}
		}

		if (activeIndex != null) opts.tags.options[activeIndex].active = false;

		if (e.keyCode == 38) {
			if (activeIndex == null || activeIndex == 0) opts.tags.options[length - 1].active = true;else opts.tags.options[activeIndex - 1].active = true;
		} else if (e.keyCode == 40) {
			if (activeIndex == null || activeIndex == length - 1) opts.tags.options[0].active = true;else opts.tags.options[activeIndex + 1].active = true;
		} else if (e.keyCode == 13 && activeIndex != null) {
			_this.select({
				item: opts.tags.options[activeIndex]
			});
		}
	}
	return true;
};

this.open = function () {
	opts.tags.isvisible = true;
	_this.trigger('open');
};

this.close = function () {
	if (opts.tags.isvisible) {
		opts.tags.isvisible = false;
		_this.trigger('close');
	}
};

this.toggle = function () {
	if (opts.tags.isvisible) _this.close();else _this.open();
};

this.select = function (e) {
	opts.tags.options.forEach(function (i) {
		return i.selected = false;
	});
	e.item.selected = true;
	_this.addTag(e.item);
	opts.tags.isvisible = false;
	_this.trigger('select', e.item);
};

this.addTag = function (item) {
	if (opts.tags.tags.indexOf(item) == -1) {
		opts.tags.tags.push(item);
	}
};

this.removeTag = function (e) {
	opts.tags.tags = opts.tags.tags.filter(function (tag) {
		if (tag._id != e.item._id) return tag;
	});
};

this.on('mount', function () {
	document.addEventListener('click', handleClickOutside);
	_this.update();
});

this.on('update', function () {
	opts.tags.options.forEach(function (item) {
		item._id = item._id || (Math.floor(Math.random() * 60466175) + 1679615).toString(36);
		if (item.selected) _this.selectfield.value = item.text;
	});
	opts.tags.tags.forEach(function (tag) {
		tag._id = tag._id || (Math.floor(Math.random() * 60466175) + 1679615).toString(36);
	});
});

this.on('unmount', function () {
	document.removeEventListener('click', handleClickOutside);
});
}, '{ }');
