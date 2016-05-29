export default class GetFriends {
  constructor(client, name, cb) {
    this.client = client
    this.name = name
    this.cb = cb
    this.friends = []
    this.cursor = -1
    this.totalFriends = 0
    this.getFriendsAmount()
  }

  getFriendsAmount() {
    this.client.get('users/show', {screen_name: this.name}, (err, resp) => {
      if (err) {
        this.cb(err)
      } else {
        this.totalFriends = resp.friends_count
        this.getFriends()
      }
    })
  }

  getFriends() {
    const opts = {
      screen_name: this.name,
      cursor: this.cursor,
      count: 200,
    }

    this.client.get('friends/list', opts, (err, resp) => {
      if (err) {
        console.log(JSON.stringify(err, 0, 2))
        cb(err, this.friends)
      } else {
        this.friends = this.friends.concat(resp.users)
        this.cursor = resp.next_cursor
        console.log(this.friends.length)

        if (this.friends.length >= this.totalFriends) {
          this.cb(null, this.friends)
        } else {
          this.getFriends()
        }
      }
    })
  }
}
