export default function (props) {
  const newProps = {...props}
  const {filtered, lists} = newProps
  let {newUsers} = newProps

  if (!newUsers) {
    return []
  } else if (!filtered || !filtered.length) {
    return props.newUsers
  }

  const filterClone = [...filtered]

  // special filters
  if (filterClone.indexOf('unlisted') > -1) {
    const listed = lists.reduce((a, b) => (
      a.concat(b.members.map((m) => m.id))
    ), [])

    newUsers = newUsers.filter((u) => (
      listed.indexOf(u.id) === -1
    ))

    filterClone.splice(filtered.indexOf('unlisted'), 1)
  }

  if (filterClone.indexOf('selected') > -1) {
    newUsers = newUsers.filter((u) => (
      u.$checked
    ))

    filterClone.splice(filtered.indexOf('selected'), 1)
  }

  // do rest of the filters eg the lists
  if (filterClone.length) {
    // only get lists mentioned in filters
    const filterLists = lists.filter((l) => (
      filterClone.indexOf(l.slug) > -1
    ))

    // concat member ids
    const filterListed = filterLists.reduce((a, b) => (
      a.concat(b.members.map((m) => m.id))
    ), [])

    // filter ids
    newUsers = newUsers.filter((u) => (
      filterListed.indexOf(u.id) > -1
    ))
  }

  return newUsers
}

