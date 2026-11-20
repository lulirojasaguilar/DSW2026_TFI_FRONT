import { useCallback, useEffect, useState } from 'react';
import { getErrorMessage } from '../../../core/helpers/getErrorMessage';

export function useApi(request, deps = []) {
  const [state, setState] = useState({ data: null, loading: true, error: '' });
  const [version, setVersion] = useState(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const run = useCallback(request, deps);

  useEffect(() => {
    let cancelled = false;

    setState((prev) => ({ ...prev, loading: true, error: '' }));
    run()
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
  }, [run, version]);

  return { ...state, reload: () => setVersion((v) => v + 1) };
}
