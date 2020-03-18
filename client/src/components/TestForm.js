import React, { Component } from "react";

export default class TestForm extends Component {
  render() {
    return (
      <div>
        <form action="localhost:5000/course/add" method="POST">
          <p>
            <label>Course Name</label>
            <input type="text" name="courseName" />
            <br />
            <br />
            <label>Course Duration</label>
            <input type="text" name="courseDuration" />
            <br />
            <br />
            <label>Course Fees</label>
            <input type="text" name="courseFee" />
            <br />
            <br />
            <button type="submit">Submit</button>
          </p>
        </form>
      </div>
    );
  }
}
