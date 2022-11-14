import {
  useState,
  //useEffect
} from "react";
// components
import TaskDetails from './TaskDetails';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getTasksQuery = gql`
  {
    tasks {
      id
      title
    }
  }
`;

function TaskList(props) {
  const [state, setState] = useState({
    selected: null
  });
  const displayTasks = () => {
    var data = props.data;
    if (data.loading) {
      return (<div>Loading tasks...</div>);
    } else {
      try {
        return data.tasks.map(task => {
          return (
            <li key={task.id} onClick={(e) => { setState({ selected: task.id }) }}>
              {task.title}
            </li>
          );
        })
      } catch (error) {
        console.log(error);
      }
    }
  }
  return (
    <div>
      <ul id="task-list">{displayTasks()}</ul>
      <TaskDetails />
    </div>
  );
}

export default graphql(getTasksQuery)(TaskList);
