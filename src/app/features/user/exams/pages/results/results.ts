import { Component, inject, Input, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CheckIcon, ChevronLeftIcon, ChevronRightIcon, CircleQuestionMark, LucideAngularModule } from "lucide-angular";
import { Router } from '@angular/router';
import { DonutChart } from "../../../../../shared/components/ui/donut-chart/donut-chart";
import { Submission } from '../../models/submission';
import { Analytics } from '../../models/analytics';
import { RadioButton } from "primeng/radiobutton";
import { Question } from '../../models/questions';

@Component({
  selector: 'app-results',
  imports: [LucideAngularModule, DonutChart, RadioButton],
  templateUrl: './results.html',
  styleUrl: './results.scss',
})
export class Results {

  @Input() submissionData?: Submission;
  @Input() submissionAnalytics: Analytics[] = [];
  @Input() questionsArray: Question[] = [];

  showExitModal: boolean = false;
  private readonly platformID = inject(PLATFORM_ID);
  private readonly router = inject(Router);

  readonly Question = CircleQuestionMark;
  readonly chevronLeft = ChevronLeftIcon;
  readonly chevronRight = ChevronRightIcon;
  readonly check = CheckIcon;

  ngOnInit() {
      console.log(this.questionsArray);

    if (isPlatformBrowser(this.platformID)) {
      const token = localStorage.getItem('token') ?? '';

      this.submissionData = {
        "id": "6bf63842-47b0-4228-9aac-256a78d13330",
        "examId": "ad62af34-224d-4667-b753-412b0966214c",
        "examTitle": "Growth and Product Optimization Exam",
        "score": 30,
        "totalQuestions": 10,
        "correctAnswers": 3,
        "wrongAnswers": 7,
        "submittedAt": "2026-04-27T19:28:14.665Z"
      }

      this.submissionAnalytics = [
        {
          "questionId": "d1e61985-941d-4540-b12e-8db5cbb07912",
          "questionText": "What is a growth loop in product optimization?",
          "selectedAnswer": {
            "id": "7e6460b0-1041-4102-96fe-ad8da91af218",
            "text": "A feedback loop between product managers and engineering teams"
          },
          "isCorrect": false,
          "correctAnswer": {
            "id": "ab15317b-5eb7-43a6-8a1e-d3ffbc59c2eb",
            "text": "A self-reinforcing mechanism where product usage drives more user acquisition or engagement"
          }
        },
        {
          "questionId": "fb9a8f53-5062-41c6-8738-c81e2650f01a",
          "questionText": "What is funnel optimization in product growth?",
          "selectedAnswer": {
            "id": "29f80478-a013-44e7-aebf-251a9ea130ba",
            "text": "Reducing the number of product features to simplify the user experience"
          },
          "isCorrect": false,
          "correctAnswer": {
            "id": "12c4a271-7447-4b2f-8141-f8a87884cd0b",
            "text": "Improving the product's performance at each stage of the user conversion journey"
          }
        },
        {
          "questionId": "93870a3f-37ac-4790-9f24-cbb1aa3bc220",
          "questionText": "What does CAC stand for in growth strategy?",
          "selectedAnswer": {
            "id": "534c026a-ccb8-4641-bd96-87827dda148b",
            "text": "Customer Activity Conversion"
          },
          "isCorrect": false,
          "correctAnswer": {
            "id": "20c15e5a-2e52-4868-8445-dd8b21314850",
            "text": "Customer Acquisition Cost — the total cost to acquire a new customer"
          }
        },
        {
          "questionId": "94973f39-fe59-402d-a495-de23d33177dd",
          "questionText": "What does the AARRR growth framework stand for?",
          "selectedAnswer": {
            "id": "7ab3f5dd-daaf-4d67-97d1-09752036a70d",
            "text": "Analysis, Action, Research, Results, Reporting"
          },
          "isCorrect": false,
          "correctAnswer": {
            "id": "664f8630-d435-4d4c-9b32-6624eee15d3f",
            "text": "Acquisition, Activation, Retention, Referral, Revenue"
          }
        },
        {
          "questionId": "ab00f547-3884-474a-af3a-cfb560bd0257",
          "questionText": "What is product-led growth (PLG)?",
          "selectedAnswer": {
            "id": "e027b2f9-bac9-4186-9188-c3e090f2056d",
            "text": "A strategy where the product itself — through user experience and value — drives acquisition and retention"
          },
          "isCorrect": true,
          "correctAnswer": {
            "id": "e027b2f9-bac9-4186-9188-c3e090f2056d",
            "text": "A strategy where the product itself — through user experience and value — drives acquisition and retention"
          }
        },
        {
          "questionId": "fb28b486-0fe7-4332-8e91-462e90e01314",
          "questionText": "What is cohort analysis in product optimization?",
          "selectedAnswer": {
            "id": "1762683b-8de8-4cc9-9a08-527dca6a03be",
            "text": "Comparing the output quality of different development team cohorts"
          },
          "isCorrect": false,
          "correctAnswer": {
            "id": "85b16a54-a8f3-4f81-9973-8d0b1c35fbcd",
            "text": "Grouping users by shared characteristics or behaviors to track patterns over time"
          }
        },
        {
          "questionId": "8c6d8abf-2fcb-4b9c-8999-df363525f693",
          "questionText": "What is the North Star Metric?",
          "selectedAnswer": {
            "id": "307a2075-adfc-48be-a640-61943fcc824d",
            "text": "The primary KPI used to measure developer team velocity"
          },
          "isCorrect": false,
          "correctAnswer": {
            "id": "c5c89ced-30db-469b-a5e7-7c27e1b4368e",
            "text": "A single metric that best captures the core value a product delivers to users"
          }
        },
        {
          "questionId": "c8991544-e9a7-47ec-ba20-7cdc4dae0005",
          "questionText": "What does DAU/MAU ratio measure in product analytics?",
          "selectedAnswer": {
            "id": "acc0064f-067d-470d-9218-38a217e5caa2",
            "text": "The proportion of daily versus monthly revenue generated by a product"
          },
          "isCorrect": false,
          "correctAnswer": {
            "id": "96034b9b-cb2c-4b9d-98c1-e43a9991363a",
            "text": "User engagement stickiness — how frequently monthly users return daily"
          }
        },
        {
          "questionId": "28660e05-142b-4d42-975a-175e77facbe3",
          "questionText": "What is churn rate in product growth metrics?",
          "selectedAnswer": {
            "id": "533a2b2d-ad57-4070-bf7c-15e0c5711754",
            "text": "The percentage of users who stop using a product over a given period"
          },
          "isCorrect": true,
          "correctAnswer": {
            "id": "533a2b2d-ad57-4070-bf7c-15e0c5711754",
            "text": "The percentage of users who stop using a product over a given period"
          }
        },
        {
          "questionId": "1c3f113d-f42a-47ae-90d3-14d0c46a13af",
          "questionText": "What is A/B testing in product optimization?",
          "selectedAnswer": {
            "id": "d519b858-2d2f-4f0d-84f1-7af8fdcc47b6",
            "text": "Comparing two versions of a feature to determine which performs better with users"
          },
          "isCorrect": true,
          "correctAnswer": {
            "id": "d519b858-2d2f-4f0d-84f1-7af8fdcc47b6",
            "text": "Comparing two versions of a feature to determine which performs better with users"
          }
        }
      ]

    }
  }







  onBackAttempt() {
    this.showExitModal = true;
  }

  onCancelExit() {
    this.showExitModal = false;
  }

  onConfirmExit() {
    this.showExitModal = false;
    this.router.navigate(['/diplomas']);
  }
}
