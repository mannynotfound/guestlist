export default function(users) {
  const isArr = Array.isArray(users)
  const oldUsers = isArr ? users : [users]

  const desiredProps = [
    'name',
    'id',
    'id_str',
    'screen_name',
    'description',
    'profile_image_url',
    'profile_banner_url',
    'profile_link_color',
    'profile_text_color',
    'verified',
    'lang',
    'location',
    'created_at',
    'favourites_count',
    'statuses_count',
    'friends_count',
    'listed_count',
    'followers_count',
  ]

  const newUsers = oldUsers.map((u) => {
    const newU = {}
    desiredProps.forEach((d) => {
      newU[d] = u[d]
    })

    return newU
  })

  return isArr ? newUsers : newUsers[0]
}
