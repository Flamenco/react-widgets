var React = require('react/addons')
  , _ = require('lodash')
  , cx    = React.addons.classSet
  , btn = require('../common/btn.jsx')

module.exports = React.createClass({

  mixins: [ require('../mixins/DataHelpersMixin')],

  propTypes: {
    value:          React.PropTypes.array,
    onChange:       React.PropTypes.func.isRequired,

    valueField:     React.PropTypes.string,
    textField:      React.PropTypes.string,

    valueComponent: React.PropTypes.component
  },

  getDefaultProps: function(){
    return {
      valueComponent: DefaultTag
    }
  },

  getInitialState: function(){
    return {
      focused: null
    }
  },

  render: function(){
      var Item     = this.props.valueComponent 
        , focusIdx = this.state.focused
        , value    = this.props.value;

      return this.transferPropsTo(
        <ul className='rw-tag-list'>
          {_.map(value, function(item, i){
            return (
              <li unselectable='on' className={cx({'rw-state-focus': focusIdx === i })}>
                <Item
                  item={item}
                  unselectable='on'
                  textField={this.props.textField}
                  valueField={this.props.valueField}/>
                <btn onClick={this._delete.bind(null, item)} unselectable='on'>
                  &times;<span className="rw-sr">{ "Remove " + this._dataText(item) }</span>
                </btn>
              </li>)
          }, this)}
        </ul>
      )
  },

  _delete: function(val, e){
    e.stopPropagation();
    this.props.onDelete(val)
  },

  removeCurrent: function(){
    var nextIdx = this.state.focused + 1;

    if ( val ) this.props.onDelete(e, val)
  },

  clear: function(){
    this.setState({ focused: null })
  },

  first: function(){
    this.setState({ focused: 0 })
  },

  last: function(){
    this.setState({ focused: this.props.value.length - 1 })
  },

  next: function(){
      var nextIdx = this.state.focused + 1;

      if ( this.state.focused === null ) 
        return

      if ( nextIdx >= this.props.value.length )
        return this.clear();

    this.setState({ focused: nextIdx })
  },

  prev: function(){
    var nextIdx = this.state.focused;

    if ( nextIdx === 0 ) return
    if ( nextIdx === null )
      nextIdx = this.props.value.length

    this.setState({ focused: nextIdx - 1 })
  }
})


var DefaultTag = React.createClass({

  mixins: [ require('../mixins/DataHelpersMixin')],

  render: function(){
      var item = this.props.item;

      return this.transferPropsTo(<span>{ item ? this._dataText(item) : '' }</span>)
  }
})