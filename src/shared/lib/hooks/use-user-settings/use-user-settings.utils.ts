import { userStorage } from 'shared/lib/utils/storage/user-storage';
import type { UserSettings } from 'shared/lib/types';
import { initialUserSettings } from './use-user-settings.constants';

const storage = userStorage<UserSettings>();

export const getUserSettings = () => storage.get(initialUserSettings);
export const setUserSettings = (value: UserSettings) => storage.set(value);
