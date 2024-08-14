import axios from "axios";
import { useState } from "react";

const useFetch = () => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [loading, setloading] = useState(true);
  return (
    <div>useFetch</div>
  )
}

export default useFetch