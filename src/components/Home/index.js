// Write your code here
// Write your code here
import {Component} from 'react'
import './index.css'

import Loader from 'react-loader-spinner'

import TeamCard from '../TeamCard'

class Home extends Component {
  state = {isLoading: true, teamsData: []}

  componentDidMount = () => {
    this.getTeams()
  }

  getTeams = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const fetchData = await response.json()
    const formattedData = fetchData.teams.map(team => ({
      name: team.name,
      id: team.id,
      teamImageURL: team.team_image_url,
    }))
    this.setState({teamsData: formattedData, isLoading: false})
  }

  renderTeamsList = () => {
    const {teamsData} = this.state

    return (
      <ul className="teams-list">
        {teamsData.map(team => (
          <TeamCard teamData={team} key={team.id} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="Oval" color="#ffffff" height="50" />
    </div>
  )

  render() {
    const {isLoading} = this.state

    return (
      <div className="home-route-container">
        <div className="teams-list-container">
          <div className="ipl-dashboard-heading-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
              alt="ipl logo"
              className="ipl-logo"
            />
            <h1 className="ipl-dashboard-heading">IPL Dashboard</h1>
          </div>
          {isLoading ? this.renderLoader() : this.renderTeamsList()}
        </div>
      </div>
    )
  }
}

export default Home
