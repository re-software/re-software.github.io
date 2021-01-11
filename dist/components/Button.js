/* src/components/Button.svelte generated by Svelte v3.29.7 */
import {
	SvelteComponent,
	attr,
	bubble,
	create_slot,
	detach,
	element,
	init,
	insert,
	listen,
	safe_not_equal,
	transition_in,
	transition_out,
	update_slot
} from "../../web_modules/svelte/internal.js";

function create_fragment(ctx) {
	let button;
	let current;
	let mounted;
	let dispose;
	const default_slot_template = /*#slots*/ ctx[2].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], null);

	return {
		c() {
			button = element("button");
			if (default_slot) default_slot.c();
			attr(button, "class", "px-4 py-2 text-md text-white bg-blue-500 rounded cursor-pointer select-none hover:bg-blue-600 active:bg-blue-700");
			button.disabled = /*disabled*/ ctx[0];
		},
		m(target, anchor) {
			insert(target, button, anchor);

			if (default_slot) {
				default_slot.m(button, null);
			}

			current = true;

			if (!mounted) {
				dispose = listen(button, "click", /*click_handler*/ ctx[3]);
				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && dirty & /*$$scope*/ 2) {
					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[1], dirty, null, null);
				}
			}

			if (!current || dirty & /*disabled*/ 1) {
				button.disabled = /*disabled*/ ctx[0];
			}
		},
		i(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(button);
			if (default_slot) default_slot.d(detaching);
			mounted = false;
			dispose();
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	let { disabled = false } = $$props;

	function click_handler(event) {
		bubble($$self, event);
	}

	$$self.$$set = $$props => {
		if ("disabled" in $$props) $$invalidate(0, disabled = $$props.disabled);
		if ("$$scope" in $$props) $$invalidate(1, $$scope = $$props.$$scope);
	};

	return [disabled, $$scope, slots, click_handler];
}

class Button extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { disabled: 0 });
	}
}

export default Button;