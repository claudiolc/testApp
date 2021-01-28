import { Container } from 'inversify';
import { Model } from './entities';
import "reflect-metadata";

const appContainer = new Container();

appContainer.bind(Model).toSelf().inRequestScope();

export { appContainer };