import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from './types';

let navigationInstance: NavigationProp<RootStackParamList>;

export function setNavigationInstance(nav: NavigationProp<RootStackParamList>) {
  navigationInstance = nav;
}

export function navigate<Route extends keyof RootStackParamList>(
  route: Route,
  params?: RootStackParamList[Route]
) {
  if (navigationInstance) {
    navigationInstance.navigate(route, params);
  }
}

export function goBack() {
  if (navigationInstance) {
    navigationInstance.goBack();
  }
}

export function reset<Route extends keyof RootStackParamList>(
  route: Route,
  params?: RootStackParamList[Route]
) {
  if (navigationInstance) {
    navigationInstance.reset({
      index: 0,
      routes: [{ name: route, params }],
    });
  }
}

export function useAppNavigation() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  setNavigationInstance(navigation);
  return navigation;
} 