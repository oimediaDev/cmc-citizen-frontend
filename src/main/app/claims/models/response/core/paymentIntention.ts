import { Moment } from 'moment'

import { PaymentOption } from 'claims/models/paymentOption'
import { RepaymentPlan } from 'claims/models/response/core/repaymentPlan'
import { MomentFactory } from 'shared/momentFactory'

export class PaymentIntention {
  paymentOption?: PaymentOption
  paymentDate?: Moment
  repaymentPlan?: RepaymentPlan

  static deserialize (input: any): PaymentIntention {
    if (!input) {
      return input
    }

    const instance = new PaymentIntention()
    instance.paymentOption = input.paymentOption
    instance.paymentDate = input.paymentDate && MomentFactory.parse(input.paymentDate)
    instance.repaymentPlan = input.repaymentPlan && {
      instalmentAmount: input.repaymentPlan.instalmentAmount,
      firstPaymentDate: MomentFactory.parse(input.repaymentPlan.firstPaymentDate),
      paymentSchedule: input.repaymentPlan.paymentSchedule,
      completionDate: input.repaymentPlan.completionDate && MomentFactory.parse(input.repaymentPlan.completionDate),
      paymentLength: input.repaymentPlan.paymentLength
    }

    return instance
  }
}
