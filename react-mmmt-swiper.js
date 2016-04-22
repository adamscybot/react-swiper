"use strict";

(function (root, factory) {
  if (typeof module !== "undefined" && module.exports) {
	module.exports = factory(
	  require("react"),
	  require("react-dom"),
	  require("swiper")
	);
  } else {
	root.ReactSwiper = factory(
	  root.React,
	  root.Swiper
	);
  }
})(this, function (React, ReactDOM, Swiper) {
  var styles = {
	container: {
	},

	wrapper: {
	  alignItems: "center"
	},

	child: {
	}
  };

  var ReactSwiper = React.createClass({
	// http://www.idangero.us/swiper/api
	propTypes: {
	  simulateTouch: React.PropTypes.bool,
	  initialSlide: React.PropTypes.number,
	  preloadImages: React.PropTypes.bool,
	  lazyLoading: React.PropTypes.bool,
	  lazyLoadingInPrevNext: React.PropTypes.bool,
	  lazyLoadingOnTransitionStart: React.PropTypes.bool,
	  pagination: React.PropTypes.node
	},

	componentDidMount: function () {
	  if (this.isMounted()) {
		var props = Object.assign({}, this.props)
		delete props.children

		if (this.props.pagination) {

			props.pagination = ReactDOM.findDOMNode(this.refs.pagination)
		}

		this.swiper = Swiper(ReactDOM.findDOMNode(this), props);
		// NOTE: Does not seem that initialSlide works with images
		// NOTE: Lazy loading is also not helped
		var initialSlide = this.props.initialSlide;
		if (initialSlide) {
		  this.swiper.on("imagesReady", function() {
			this.swiper.slideTo(initialSlide);
		  }.bind(this));
		}
	  }
	},

	componentDidUpdate: function () {
	},

	componentWillUnmount: function () {
	  this.swiper.destroy();
	  delete this.swiper;
	},

	shouldComponentUpdate: function (nextProps) {
	  return (typeof this.props.shouldUpdate !== "undefined") && this.props.shouldUpdate(nextProps);
	},

	render: function() {
	  return React.createElement("div", Object.assign({}, this.props, {style: styles.container, className: "swiper-container"}),
	    [React.createElement("div", {style: styles.wrapper, className: "swiper-wrapper"},
		  React.Children.map(this.props.children, function (child) {
			return React.cloneElement(child, { style: Object.assign(child.props.style || {}, styles.child), className: "swiper-slide " + child.props.className });
		  })
	    ),
	    this.props.pagination ? React.cloneElement(this.props.pagination, {className: "swiper-pagination" + (this.props.pagination.className ? ' ' + this.props.pagination.className : ''), ref: "pagination"}) : null]
	  );
	}
  });

  return ReactSwiper;
});
