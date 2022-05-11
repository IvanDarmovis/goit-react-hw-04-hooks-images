import { AtomSpinner } from 'react-epic-spinners';
import s from './Loader.module.css';

export default function Loader() {
  return <AtomSpinner color="#3f51b5" className={s.sipner} />;
}
