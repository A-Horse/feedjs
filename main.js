import program from 'commander';
import Controller from './ctrl';
import loop from './lib/loop';

program
  .version('0.0.1')
  .option('-C, --chdir <path>', 'change the working directory')
  .option('-c, --config <path>', 'set config path. defaults to ./deploy.conf')
  .option('-T, --no-tests', 'ignore test hook');

program
  .version('0.0.1')
  .command('start')
  .action(() => {

  });

const ctrl = new Controller();
ctrl.start();
setTimeout(function() {
  ctrl.stop();
}, 15000);
