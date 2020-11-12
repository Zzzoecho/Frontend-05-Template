# 带括号的四则运算

终结符
+ - * / ( )
Number

非终结符
MultiplicativeExpression
AddtiveExpression
BracketExpression


<MultiplicativeExpression>::=<Number> | 
                             <MultiplicativeExpression> "*" <NUmber> | 
                             <MultiplicativeExpression> "/" <Number> |
                             
<AddtiveExpression>::=<MultiplicativeExpression>|
                      <MultiplicativeExpression> "+" <MultiplicativeExpression> |
                      <MultiplicativeExpression> "-" <MultiplicativeExpression> |
                      
<BracketExpression>::=<AddtiveExpression> |
                       "(" <AddtiveExpression> ")" |