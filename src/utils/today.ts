import dayjs from 'dayjs';

import { dateFormat } from '../config';

const today = (): string => dayjs().format(dateFormat);

export default today;
