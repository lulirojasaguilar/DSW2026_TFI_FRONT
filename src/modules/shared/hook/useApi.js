import { useEffect, useRef, useState } from 'react';
import { getErrorMessage } from '../../../core/helpers/getErrorMessage';

export function useApi(request, deps = []) {
  const [state, setState] = useState({ data: null, loading: true, error: '' });
  const [version, setVersion] = useState(0);
  const requestRef = useRef(request);

  useEffect(() => {
    requestRef.current = request;
  });

  const key = JSON.stringify(deps);

  useEffect(() => {
    let cancelled = false;

    setState((prev) => ({ ...prev, loading: true, error: '' }));
    requestRef
      .current()
      .then(
        (data) => !cancelled && setState({ data, loading: false, error: '' })
      )
      .catch(
        (error) =>
          !cancelled &&
          setState({
            data: null,
            loading: false,
            error: getErrorMessage(error),
          })
      );

    return () => {
      cancelled = true;
    };
  }, [key, version]);

  return { ...state, reload: () => setVersion((v) => v + 1) };
}
