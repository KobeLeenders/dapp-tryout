import { Button, Card, Col, Dropdown, Menu, Row } from "antd";
import { ButtonProps } from "antd/lib/button";
import React, { useCallback } from "react";
import { LABELS } from "../../constants";
import { useTokenCards } from "../../hooks";
import "./style.less";

export interface ConnectButtonProps
  extends ButtonProps,
  React.RefAttributes<HTMLElement> {
  allowWalletChange?: boolean;
}


function truncateString(text: string) {
  return text.substring(0, 4) + '...' + text.substring(text.length - 4, text.length)
}

export const MigrateableTokenDisplay = (props: ButtonProps) => {
  const tokenCardsData = useTokenCards();

  const { onClick, children, disabled, ...rest } = props;

  const handleMuttonButtonClick: React.MouseEventHandler<HTMLElement> = useCallback(
    (event) => {
      onClick?.(event);
    },
    [ onClick ]
  );

  return (
    <>
      {tokenCardsData.map(tokenCard => (
        <Card className='token-card' key={tokenCard.mint}>
          <Row justify="space-around">
            <Col span={8}>
              <Row>
                <Col span={4}>
                  <span className="dot"></span>
                </Col>
                <Col span={20}>
                  <div>
                    {tokenCard.tokenName}
                  </div>
                  <div>
                    <small className='card-subtext'>Asset</small>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col span={4}>
              <div>
                <div style={{ color: '#05bb8c' }}>
                  {truncateString(tokenCard.mint)}
                </div>
                <div>
                  <small className='card-subtext'>Account</small>
                </div>
              </div>

            </Col>
            <Col span={4}>
              <div style={{textAlign: 'right', fontWeight: 'bold'}}>
                <div>
                  {tokenCard.balance}
                </div>
                <div>
                  <small className='card-subtext'>= ${tokenCard.balanceUSD}</small>
                </div>
              </div>
            </Col>
            <Col className='step-button-section' span={8}>
              <button className='step-button' key={tokenCard.mint} id={tokenCard.mint} onClick={(e) => { handleMuttonButtonClick(e) }}>Migrate {tokenCard.tokenName}</button>
            </Col>
          </Row>
        </Card>

      ))}

    </>
  )

}


/*
  useEffect(() => {
      var tempTokenCards: any[] = [];
      tokenCardsData.forEach((tokenCard) => {
        setTokenCards(tempTokenCards.concat(
          <Card className='token-card' key={tokenCard.mint}>
            <Row justify="space-around">
              <Col span={8}>
                <Row>
                  <Col>
                    <span className="dot"></span>
                  </Col>
                  <Col>
                    <div>
                      {tokenCard.tokenName}
                    </div>
                    <div>
                      <small>Asset</small>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col span={4}>
                <div>
                  <div style={{ color: '#05bb8c' }}>
                    {truncateString(tokenCard.mint)}
                  </div>
                  <div>
                    <small>Account</small>
                  </div>
                </div>

              </Col>
              <Col span={4}>
                <div>
                  <div>
                    {tokenCard.balance}
                  </div>
                  <div>
                    <small>= ${tokenCard.balanceUSD}</small>
                  </div>
                </div>
                </Col>
              <Col span={8}>
                <button className='step-button' onClick={(e) => { clickMigrate(tokenCard.mint) }}>Migrate</button>
                </Col>
            </Row>
          </Card>
        ));
      })
  }, [tokenCardsData, signTransaction]);


*/