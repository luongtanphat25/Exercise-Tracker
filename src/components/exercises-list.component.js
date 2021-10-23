import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Exercise = (props) => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0, 10)}</td>
    <td>
      <div className="row">
        <div className="col">
          <Link
            className="btn btn-info w-100"
            to={"/edit/" + props.exercise._id}
          >
            edit
          </Link>
        </div>
        <div className="col">
          <button
            className="btn btn-danger w-100"
            onClick={() => {
              props.deleteExercise(props.exercise._id);
            }}
          >
            delete
          </button>
        </div>
      </div>
    </td>
  </tr>
);

export default class ExercisesList extends Component {
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this);

    this.state = { exercises: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/exercises/")
      .then((response) => {
        this.setState({
          exercises: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteExercise(id) {
    axios
      .delete("http://localhost:5000/exercises/" + id)
      .then((res) => console.log(res.data));

    this.setState({
      exercises: this.state.exercises.filter((el) => el._id !== id),
    });
  }

  exercisesList() {
    return this.state.exercises.map((ex) => {
      return (
        <Exercise
          exercise={ex}
          deleteExercise={this.deleteExercise}
          key={ex._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.exercisesList()}</tbody>
        </table>
      </div>
    );
  }
}
