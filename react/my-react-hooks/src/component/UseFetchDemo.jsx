import { useFetch } from '../hooks/useFetch';

export function UseFetchDemo() {
  const { data, refetch, isLoading } = useFetch(
    'https://jsonplaceholder.typicode.com/posts/1'
  );

  return (
    <div className="card">
      <button onClick={refetch}>refetch data</button>
      <div>
        <p>{isLoading ? 'Loading' : 'Fetched'}</p>
        <p>{data && JSON.stringify(data)}</p>
      </div>
    </div>
  );
}
