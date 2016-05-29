import React, {PropTypes} from 'react'
import Card from '../Card/Card'

class Page extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pageIdx: 0,
      pageInput: 1,
    }
  }

  static displayName = 'Page'

  static propTypes = {
    users: PropTypes.array,
  }

  static defaultProps = {
    users: []
  }

  computePages(users, sliceNum) {
    const pages = []
    let tempArr = []

    users.forEach((u, i, arr) => {
      tempArr.push(u)
      if (tempArr.length === sliceNum || i === arr.length - 1) {
        pages.push(tempArr)
        tempArr = []
      }
    })

    return pages
  }

  pagePrev(pages, pageIdx) {
    let next

    if (pageIdx - 1 < 0) {
      next = pages.length - 1
    } else {
      next = pageIdx - 1
    }

    this.setState({
      pageIdx: next,
      pageInput: next + 1,
    })
  }

  pageNext(pages, pageIdx) {
    let next

    if (pageIdx + 1 === pages.length) {
      next = 0
    } else {
      next = pageIdx + 1
    }

    this.setState({
      pageIdx: next,
      pageInput: next + 1,
    })
  }

  onPageInput(pages, e) {
    if (!e.target.value.length) {
      return this.setState({
        pageInput: ''
      })
    }

    const val = parseInt(e.target.value, 10)

    if (isNaN(val)) {
      return null
    }

    const newState = {
      pageInput: val,
    }

    if (val - 1 >= 0 && val - 1 < pages.length) {
      newState.pageIdx = val - 1
    }

    return this.setState(newState)
  }

  render() {
    const {pageIdx, pageInput} = this.state
    const {users} = this.props
    const pages = this.computePages(users, 20)
    if (!pages.length) return null

    return (
      <div className="Page">
        <div className="Page-pagination">
          <div className="Page-pagination-text">
            <div
              className="Page-pagination-prev"
              onClick={this.pagePrev.bind(this, pages, pageIdx)} />
              {'PAGE '}
              <input
                type="text"
                onChange={this.onPageInput.bind(this, pages)}
                value={pageInput} />
            {`of ${pages.length}`}
            <br />
            <span>{users.length}{' TOTAL'}</span>
            <div
              className="Page-pagination-next"
              onClick={this.pageNext.bind(this, pages, pageIdx)} />
          </div>
        </div>
        {pages[pageIdx].map((user, i) => (
          <Card user={user} key={i} />
        ))}
        <div className="Page-pagination">
          <div className="Page-pagination-text">
            <div
              className="Page-pagination-prev"
              onClick={this.pagePrev.bind(this, pages, pageIdx)} />
              {'PAGE '}
              <input
                type="text"
                onChange={this.onPageInput.bind(this, pages)}
                value={pageInput} />
            {`of ${pages.length}`}
            <br />
            <span>{users.length}{' TOTAL'}</span>
            <div
              className="Page-pagination-next"
              onClick={this.pageNext.bind(this, pages, pageIdx)} />
          </div>
        </div>
      </div>
    )
  }
}

export default Page
