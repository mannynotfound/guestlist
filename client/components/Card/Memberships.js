import React, {PropTypes} from 'react'

class Memberships extends React.Component {
  static displayName = 'Memberships'

  static propTypes = {
    user: PropTypes.object,
  }

  static contextTypes = {
    store: PropTypes.object,
  }

  render() {
    const {lists} = this.context.store.getState().app
    const {user} = this.props

    const memberLists = lists.filter((list) => {
      const matches = list.members.filter((m) => m.id === user.id)
      return matches[0]
    })

    if (!memberLists.length) return null
    const listNames = memberLists.map((ml) => ml.slug).sort()

    return (
      <div className="Memberships">
        {listNames.map((ln, i, arr) => (
           <div className="Membership-list" key={i}>
             {'#'}
             {ln}
             {i === arr.length - 1 ? '' :
               <span style={{marginRight: 5}}>
                  {','}
               </span>}
           </div>
        ))}
      </div>
    )
  }
}

export default Memberships
