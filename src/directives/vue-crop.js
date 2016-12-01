var vueCrop = {}
var options = {}
var events = [
    'create',
    'start',
    'move',
    'end',
    'focus',
    'blur',
    'remove'
]

vueCrop.install = function(Vue) {

    Vue.directive('crop', {

        acceptStatement: true,

        bind: function() {
            var event = this.arg
            console.log(this.arg)
            if ($.inArray(event, events) == -1) {
                console.warn('Invalid v-crop event: ' + event)
                return
            }

            if (this.vm.jcrop) return

            var $wrapper = $(this.el).wrap('<div/>').parent()
            $wrapper.width(this.el.width).height(this.el.height)

            this.vm.jcrop = $.Jcrop.attach($wrapper, options)
        },

        update: function(callback) {
            this.vm.jcrop.container.on('crop' + this.arg, callback)
        },

        unbind: function() {
            this.vm.jcrop.container.off('crop' + this.arg)

            if (this._watcher.id != 1) return

            this.vm.jcrop.destroy()
            this.vm.jcrop = null
        }
    })
}

vueCrop.setOptions = function(opts) {
    options = opts
}

export default vueCrop;
