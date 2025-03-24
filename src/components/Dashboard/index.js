import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Navbar from "../Navbar";

const DashboardContainer = styled.div`
  text-align: center;
  font-family: Arial, sans-serif;
`;

const CardsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 20px;
  padding: 20px;
  @media (min-width: 768px) {
    justify-content: flex-start;
  }
`;

const Card = styled.div`
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  padding: 15px;
  width: 200px;
  text-align: center;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s, background-color 0.3s;

  &:hover {
    transform: scale(1.05);
    background-color: #e6f7ff;
  }
`;


class Dashboard extends Component {
    state = {
            cards: [
                { id: 1, name: "Location 1" },
                { id: 2, name: "Location 2" },
                { id: 3, name: "Location 3" }
            ]
        };

    componentDidMount() {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("User not logged in");
            this.props.history.push("/login");
            window.location.reload();
            return;
        }
        
            axios
              .get("http://localhost:5000/map", { headers: { Authorization: token } })
              .then((res) => console.log("Dashboard logged"))
    }

    handleCardClick = () => {
      this.props.history.push("/map");
      window.location.reload();
    };

    render() {
        return (
            <DashboardContainer>
                <Navbar/>
                <CardsContainer>
                  {this.state.cards.map((card) => (
                      <Card
                          key={card.id}
                          onClick={this.handleCardClick}
                          style={{ cursor: "pointer", padding: "10px", border: "1px solid black" }}
                      >
                          {card.name}
                      </Card>
                  ))}
                </CardsContainer>
            </DashboardContainer>
        );
    }
}

export default withRouter(Dashboard);