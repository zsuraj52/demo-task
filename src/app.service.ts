import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService {
  constructor(private logger: Logger) {}
  async getCalcResultService(
    expression: string,
  ): Promise<
    { result: number } | { statusCode: number; message: string; error: string }
  > {
    this.logger.log(`🚀 input expression: ${expression}`);
    const getAllDataFromExpression: string[] = expression
      .split(/(\+|\-|\*|\/)/)
      .map((token) => token.trim())
      .filter((token) => token !== '');
    this.logger.debug(`getAllDataFromExpression: ${getAllDataFromExpression}`);
    this.logger.debug(
      `getAllDataFromExpression length: ${getAllDataFromExpression.length}`,
    );

    if (
      getAllDataFromExpression.length === 0 ||
      getAllDataFromExpression.some(
        (token) =>
          isNaN(Number(token)) && !['+', '-', '*', '/'].includes(token),
      )
    ) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Invalid expression provided',
        error: 'Bad Request',
      });
    }

    const highPrecedenceOperatorArray: string[] = ['*', '/'];
    const lowPrecedenceOperatorArray: string[] = ['+', '-'];

    const getAllHighPrecedenceOperatorArray: string[] =
      getAllDataFromExpression.filter((token: string) =>
        highPrecedenceOperatorArray.includes(token),
      );
    this.logger.log(
      `getAllHighPrecedenceOperatorArray: ${getAllHighPrecedenceOperatorArray}`,
    );

    const getAllLowPrecedenceOperatorArray: string[] =
      getAllDataFromExpression.filter((token: string) =>
        lowPrecedenceOperatorArray.includes(token),
      );
    this.logger.log(
      `getAllLowPrecedenceOperatorArray: ${getAllLowPrecedenceOperatorArray}`,
    );

    const numbersInExpression: string[] = getAllDataFromExpression.filter(
      (token: string) =>
        !highPrecedenceOperatorArray.includes(token) &&
        !lowPrecedenceOperatorArray.includes(token),
    );
    this.logger.debug(`numbersInExpression: ${numbersInExpression}`);

    if (
      numbersInExpression.length ===
      getAllHighPrecedenceOperatorArray.length +
        getAllLowPrecedenceOperatorArray.length
    ) {
      this.logger.error(`Number's Count & Operator's Count Are Same`);
      throw new BadRequestException({
        statusCode: 400,
        message: 'Invalid expression provided',
        error: 'Bad Request',
      });
    }

    const stack: number[] = [];
    let currentOperator = '+';

    getAllDataFromExpression.forEach((token) => {
      this.logger.log(`getAllDataFromExpression.forEach ~ token ${token}`);
      if (['+', '-', '*', '/'].includes(token)) {
        currentOperator = token;
      } else {
        this.logger.log(`Inside Else`);
        const operand = parseFloat(token);
        this.logger.log(`operand : ${operand}`);
        this.logger.log(`stack : ${stack}`);
        switch (currentOperator) {
          case '+':
            stack.push(operand);
            break;
          case '-':
            stack.push(-operand);
            break;
          case '*':
            stack.push(stack.pop()! * operand);
            break;
          case '/':
            stack.push(stack.pop()! / operand);
            break;
          default:
            throw new BadRequestException({
              statusCode: 400,
              message: 'Invalid operator',
              error: 'Bad Request',
            });
        }
      }
    });
    this.logger.debug(`Stack Array Elements : ${stack}`);
    const result = stack.reduce((acc, val) => acc + val, 0);

    return { result };
  }

  async fetchData(): Promise<any> {
    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/posts/1',
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch data from the fake API');
    }
  }
}
